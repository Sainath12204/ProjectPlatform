import React, { useState,useEffect } from "react";
import { TagsInput } from "react-tag-input-component";
import { Button, Input, Textarea, Dialog } from "@material-tailwind/react";
import { addProject } from "../services/projectData";
import { LongDialog } from "../components/showResult";

function ProjectUploadPage() {
  const [projectData, setProjectData] = useState({
    title: "",
    author: [],
    domain: [],
    abstract: "",
    docs: null,
  });

  const [similarProjects, setSimilarProjects] = useState(null);
  const [showDialog,setShowDialog] = useState(false);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    // Retrieve data from local storage when the component mounts
    const storedData = JSON.parse(localStorage.getItem("projectData"));
    if (storedData) {
      setProjectData(storedData);
    }
  }, []);
  
  const handleInputChange = (field, value) => {
    setProjectData((prevData) => ({ ...prevData, [field]: value }));
  };
  
  
  const handlePlagiarismCheck = async () => {
    try {
      setShowDialog(true);
      setOpen(true);

    } catch (error){
        console.error("Error in plagiarism check", error);
      }
};

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProjectData({ ...projectData, docs: file });
  };

  const handleUploadProject = async () => {
    try {
      console.log(projectData)
      localStorage.setItem("projectData", JSON.stringify(projectData));
      const newProject = await addProject(projectData);
      console.log("Project uploaded successfully:", newProject);

      setProjectData({
        title: "",
        author: [],
        domain: [],
        abstract: "",
        docs: null,
      });
    } catch (error) {
      console.log(error.response.data.similarProjects);
      if(error.response.status===409){
      setShowDialog(true);
      setOpen(true);
      setSimilarProjects(error.response.data.similarProjects);
      }
      console.error("Error uploading project:", error);
    }
  };
 
 
  const handleOpen = () => setOpen(!open);


  return (
    <>
      <div className="mt-16">
        <h1 className="flex justify-center mt-3 mb-6 text-3xl md:text-5xl text-bold">
          Project Upload
        </h1>
      </div>
      <div className="flex justify-center m-0 p-0">
        <section className="flex flex-col md:flex-row mx-auto p-2 md:p-4 shadow-md rounded-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUploadProject();
            }}
            encType="multipart/form-data"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 justify-center"
            >
            <div className="col-span-2 md:col-span-1 p-2 md:p-4 rounded-4 text-18 font-bold text-xl">
              Idea Title (100 characters):
            </div>
            <Input
              label="Title"
              onChange={(e) => {
                handleInputChange("title", e.target.value);
              }}
              value={projectData.title}
              containerProps={{ className: "place-self-center" }}
              />

            <div className="col-span-2 md:col-span-1 p-2 md:p-6 rounded-4 text-18 font-bold text-xl">
              Author(s) Username:
            </div>
            <TagsInput
              value={projectData.author}
              onChange={(value) => handleInputChange("author", value)}
              name="Author"
              placeHolder="Enter Author Name:"
            />

            <div className="col-span-2 md:col-span-1 p-2 md:p-6 rounded-4 text-18 font-bold text-xl">
              Domain (AIML, Blockchain, etc):
            </div>
            <TagsInput
              value={projectData.domain}
              onChange={(value) => handleInputChange("domain", value)}
              name="Domain"
              placeHolder="Enter Domain:"
              />

            <div className="col-span-2 md:col-span-1 p-2 md:p-12 rounded-4 text-18 font-bold text-xl content-center">
              Abstract (1500 characters):
            </div>
            <Textarea
              label="Abstract"
              onChange={(e) => handleInputChange("abstract", e.target.value)}
              value={projectData.abstract}
            />

            <div className="col-span-2 md:col-span-1 p-2 md:p-6 rounded-4 text-18 font-bold text-xl">
              Document (PDF or word format, up to 500Kb):
            </div>
            <div className="col-span-2 md:col-span-1 p-2 md:p-6 rounded-4 text-18 font-bold text-xl">
              <input
                type="file"
                accept=".pdf, .doc, .docx"
                onChange={handleFileChange}
                multiple
              />
            </div>

            <div className="mx-auto col-span-2">
              <Button className="mb-4" variant="filled" size="lg" type="submit" onClick={handlePlagiarismCheck} > 
              Plagiarism Checker
              </Button>
              <br />
              <Button variant="filled" size="lg" type="submit" onClick={handleUploadProject}>
                Upload Project
              </Button>

              {showDialog && (
          <LongDialog
            isOpen={showDialog}
            onClose={() => setShowDialog(false)}
            similarProjects={similarProjects}
            open={open}
            handleOpen={handleOpen}
            />
            )}

            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default ProjectUploadPage;
