"use client"
import Heading from "../utils/Heading";
import Dashboard from "../components/Dashboard/Dashboard"


export default function Home() {
  return (
    <main className="lg:px-[12%] pt-16">
      <Heading
        description="A comprehensive system for managing tasks "
        keywords="Task,Task Management,Kanban"
        title="Dashboard"
      />
      <Dashboard />
    </main>
  );
}
