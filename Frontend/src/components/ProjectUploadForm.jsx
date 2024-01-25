import React, { useContext } from "react";
import { TagsInput } from "react-tag-input-component";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { SessionContext } from "../components/SessionProvider.jsx";

const ProjectUploadForm = ({ projectData, handleFileChange, handleUploadProject, isFormValid, setMessage, handleInputChange }) => {
  const { user } = useContext(SessionContext);
  const getDefaultAuthor = () => (user && user.username ? [user.username] : []);
  
  const showAlertMessage = (message) => {
    setMessage({ type: "error", message});
  };


  return (
    <form
      onSubmit={(e) => {
      e.preventDefault();
      console.log(projectData.author);
      if (!projectData.author || !projectData.author.includes(user.username)) {
      showAlertMessage("Please enter your username in the Author field.");
      return;
    }
    if (isFormValid()) {
       handleUploadProject();
    } else {
      setMessage({ type: "error", message: "Please fill in all required fields." });
    }
      }}
      encType="multipart/form-data"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left"
    >
      <div className="md:py-3 flex place-items-center pl-4 col-span-2 md:col-span-1 rounded-4 text-18 font-bold text-xl">
        Idea Title (100 characters):
      </div>
      <Input
        label="Title"
        onChange={(e) => handleInputChange("title", e.target.value)}
        value={projectData.title}
        containerProps={{ className: "place-self-center" }}
      />

      <div className="md:py-3 flex place-items-center pl-4 col-span-2 md:col-span-1 rounded-4 text-18 font-bold text-xl">
        Author(s) Username:
        <br/>
        (Your username - First part of your respective email Id)
      </div>
      <TagsInput
        value={projectData.author || getDefaultAuthor()}
        onChange={(value) => handleInputChange("author", value)}
        name="Author"
        placeHolder="Enter Author Name:"
      />

      <div className="md:py-3 flex place-items-center pl-4 col-span-2 md:col-span-1 rounded-4 text-18 font-bold text-xl">
        Domain (AIML, Blockchain, etc):
      </div>
      <TagsInput
        value={projectData.domain}
        onChange={(value) => handleInputChange("domain", value)}
        name="Domain"
        placeHolder="Enter Domain:"
      />

      <div className="md:py-14 flex place-items-center pl-4 col-span-2 md:col-span-1 rounded-4 text-18 font-bold text-xl content-center">
        Abstract (1500 characters):
      </div>
      <Textarea
        label="Abstract"
        onChange={(e) => handleInputChange("abstract", e.target.value)}
        value={projectData.abstract}
      />

      <div className="md:py-3 flex place-items-center pl-4 col-span-2 md:col-span-1 rounded-4 text-18 font-bold text-xl">
        Document (PDF or word format, up to 500Kb):
      </div>
      <div className="flex place-items-center col-span-2 md:col-span-1 rounded-4 text-18 font-bold text-xl">
        <input
          type="file"
          accept=".pdf, .doc, .docx"
          onChange={handleFileChange}
          multiple
        />
      </div>

      <div className="flex flex-col justify-center items-center mx-auto col-span-2">
        <Button  variant="filled" size="lg" type="submit">
          Plagiarism Checker
        </Button>
        <br />
        <Button variant="filled" size="lg" type="submit">
          Upload Project
        </Button>
      </div>
    </form>
  );
};

export default ProjectUploadForm;

