import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "../../lib/auth/login";
import { getKamarById } from "../../lib/dashboard/data_kamar";
import ReservasiForm from "./ReservasiForm";

export default async function ReservasiPage({ searchParams }) {
  // Await searchParams as required by Next.js 15+ async APIs
  const resolvedSearchParams = await searchParams;
  const id_kamar = resolvedSearchParams.room;

  // Retrieve user session
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  let room = null;
  if (id_kamar) {
    room = await getKamarById(id_kamar);
  }

  return <ReservasiForm room={room} session={session} />;
}
