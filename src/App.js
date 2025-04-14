import { useState } from 'react';
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Sorting Visualizer",
    description: "Visualizes common sorting algorithms like bubble sort and merge sort.",
    repo: "https://github.com/your-username/sorting-visualizer",
    demoComponent: () => <div className="text-center">[Insert Sorting Visualizer Here]</div>
  },
  {
    title: "Weather Dashboard",
    description: "A simple weather app using an external API.",
    repo: "https://github.com/your-username/weather-dashboard",
    demoComponent: () => <div className="text-center">[Insert Weather App Here]</div>
  }
  // Add more projects here
];

export default function Portfolio() {
  const [activeDemo, setActiveDemo] = useState(null);

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, idx) => (
        <motion.div
          key={idx}
          className="rounded-2xl shadow-lg hover:shadow-2xl transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Card>
            <CardContent className="p-4 flex flex-col gap-4">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-base text-gray-600">{project.description}</p>
              <div className="flex justify-between">
                <Button onClick={() => setActiveDemo(idx)} variant="outline">Live Demo</Button>
                <a href={project.repo} target="_blank" rel="noopener noreferrer">
                  <Button>GitHub</Button>
                </a>
              </div>
              {activeDemo === idx && (
                <div className="mt-4 p-4 border rounded-xl bg-gray-50">
                  {project.demoComponent()}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

