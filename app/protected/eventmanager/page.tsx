"use client"
import {EventForm } from "./EventForm";

export default function EventManagerPage() {


  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Event Manager</h1>
      <p className="text-sm text-muted-foreground">
        Create and manage your events here.
      </p>
      <EventForm />
    </div>
  );
}