import { projectData } from "../data/projectsData"
import ProjectComponent from "./projectComponent";
const Projects = () => {
    return <ProjectComponent props={projectData} />
}
export default Projects;