"use client"
import {EventForm } from "./EventForm";

export default function EventManagerPage() {


  return (
    <main className="flex flex-col gap-4">
    <div className="flex flex-col w-96 gap-2">
      <h1 className="text-2xl font-bold">Event Manager</h1>
      <p className="text-sm text-muted-foreground">
        Create and manage your events here.
      </p>
    </div>
    <EventForm />
    </main>
  );
}