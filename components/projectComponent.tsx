import React from "react";

type Projects = {
  id: number;
  name: string;
  desc: string;
  links: {
    gitLink: string;
    deckLink: string;
  };
};

type ProjectProps = {
  props: Projects[];
};
const ProjectComponent = ({ props }: ProjectProps) => {
  return (
    <div className="flex flex-col min-h-screen w-[60%] m-auto py-16">
      {/* Section title */}
      <h1 className="text-2xl font-semibold text-gray-600 dark:text-gray-100 mb-8">
        Projects
      </h1>

      {/* Project list */}
      <div className="flex flex-col space-y-10">
        {props.map((project) => (
          <div
            key={project.id}
            className="flex flex-col space-y-3"
          >
            {/* Project name */}
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {project.name}
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-prose">
              {project.desc}
            </p>

            {/* Links */}
            <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
              <a
                href={project.links.gitLink}
                className="hover:text-gray-900 dark:hover:text-gray-200 transition"
              >
                GitHub ↗
              </a>
              <a
                href={project.links.deckLink}
                className="hover:text-gray-900 dark:hover:text-gray-200 transition"
              >
                Deck ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectComponent;
