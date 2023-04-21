import { useState } from "react";

export const Home = () => {
  const [show, setShow] = useState(false); //afiseaza divurile
  const [showBut, setShowBut] = useState(true); //afiseaza butonul de +
  const [edit, setEdit] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); //afiseaza imaginea randata
  const [title, setTitle] = useState(""); //modifica state-ul inputului title
  const [link, setLink] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [errors, setErrors] = useState({});
  const [projects, setProjects] = useState([]);
  

  const handleDelete = (project) => {
    setProjects((prevProjects) => prevProjects.filter((p) => p !== project));
  };

  const handleSave = () => {
    setProjects((prevState) =>
      prevState.map((project) => {
        if (project === edit) {
          return {
            ...project,
            title: title,
            link: link,
            description: description,
            image: previewImage,
          };
        }

        return project;
      })
    );
    setEdit(null);
  };

  const handleCloseEdit = () => {
    setEdit(null);
  };

  const handleEdit = (project) => {
    setEdit(project);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      setShowBut(!showBut);
      setShow(!show);
      const newProject = {
        image: previewImage,
        title: title,
        link: link,
        description: description,
      };
      console.log(newProject);
      setProjects((prevState) => [...prevState, newProject]);
      setPreviewImage(null);
      setTitle("");
      setLink("");
      setDescription("");
    } else {
      alert("Please complete all the inputs");
      setErrors(formErrors);
    }
  };
  const validateForm = () => {
    const errors = {};
    if ((!previewImage, !link)) {
      errors.previewImage = "Image is required";
      errors.link = "Link is required";
    }
    return errors;
  };

  const toggleShow = () => {
    setShow(!show);
    setShowBut(!showBut);
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
  };

  return (
    <div className="">
      <div className="w-full flex flex-col justify-start items-center h-96 ">
        <div className=" flex flex-col justify-center  items-center">
          <div className="flex flex-row mx-auto bg-slate-400 items-center justify-center">
            <div className="flex flex-wrap justify-center items-center">
              <div className="flex justify-start order-last items-center">
                {showBut && (
                  <button
                    className="ml-5 rounded-full w-12 h-12 flex flex-col justify-center items-center bg-slate-900"
                    onClick={toggleShow}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-500 w-8 h-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex flex-col  mx-4 w-full sm:w-96 bg-gray-900 rounded-xl shadow my-4"
                >
                  <div className="">
                    <img
                      onClick={() => handleEdit(project)}
                      className="w-full cursor-pointer h-64 sm:h-76 object-cover rounded-t-xl"
                      src={project.image}
                    />
                  </div>

                  <div className="px-6 py-4">
                    <h5 className="mb-2  text-2xl font-bold tracking-tight text-white">
                      {project.title}
                    </h5>
                    <a
                      
                      href={project.link}
                      className="mb-3 font-mono text-sky-300 underline"
                      target="_blank"
                    >
                      {project.link}
                    </a>
                    <p className="mb-3 font-mono h-auto resize-none resize-y text-gray-300">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <button
                      className="focus:outline-none w-1/4  text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                      onClick={() => handleDelete(project)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {edit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="w-full mx-3 lg:mx-auto max-w-xl bg-slate-900 rounded-lg shadow-lg">
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center p-5 border-b border-slate-600 rounded-t">
                        <h3 className="text-slate-300 text-xl md:text-3xl font-semibold">
                          Edit your post
                        </h3>
                        <button
                          className="text-3xl leading-none font-semibold text-slate-400 hover:text-gray-500 outline-none focus:outline-none"
                          onClick={handleCloseEdit}
                        >
                          X
                        </button>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <div className="flex mt-4 justify-center w-[95%] ">
                          {previewImage ? (
                            <div className="flex h-30 flex-col justify-center items-center  sm:mt-5 ">
                              <label
                                htmlFor="addImage"
                                className="flex justify-center items-center"
                              >
                                <img
                                  className="w-[98%]"
                                  src={previewImage}
                                  alt="Preview"
                                />
                              </label>
                              <input
                                id="addImage"
                                type="file"
                                accept="image/png, image/jpeg"
                                className="cursor-pointer hidden"
                                onChange={handleImageUpload}
                              />
                            </div>
                          ) : (
                            <div className="flex items-center justify-center w-full ">
                              <label
                                htmlFor="dropzone-file"
                                className="font-mono flex flex-col items-center justify-center w-full sm:w-2/3 h-30 sm:h-64 border-3 border-sky-300 border-dotted rounded-lg cursor-pointer bg-slate-800 dark:hover:bg-slate-700  hover:bg-gray-100 "
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                                  <svg
                                    aria-hidden="true"
                                    className="w-10 h-10 mb-3 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    ></path>
                                  </svg>
                                  <p className="mb-2 text-sm text-gray-400 ">
                                    <span className="font-semibold">
                                      Click to change image
                                    </span>{" "}
                                    or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-400 ">
                                    SVG, PNG, JPG or GIF
                                  </p>
                                </div>
                              </label>
                              <input
                                id="dropzone-file"
                                type="file"
                                accept="image/png, image/jpeg"
                                className="hidden"
                                onChange={handleImageUpload}
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col w-11/12 sm:w-2/3 justify-center  ">
                          <div className="my-2 ">
                            <label className="text-xl flex font-mono text-slate-300">
                              Title
                            </label>
                            <input
                              type="text"
                              className="w-full pl-2.5 font-mono bg-slate-800 rounded text-slate-300 border border-gray-400"
                              placeholder={edit.title}
                              value={title}
                              onChange={(event) => setTitle(event.target.value)}
                            />
                          </div>
                          <div className="my-2">
                            <label className="text-xl flex font-mono text-slate-300">
                              Link
                            </label>
                            <input
                              type="text"
                              className="w-full pl-2.5 font-mono bg-slate-800 rounded text-slate-300 border border-gray-400"
                              placeholder={edit.link}
                              value={link}
                              onChange={handleLinkChange}
                            />
                          </div>
                          <div className="my-2">
                            <label className="text-xl font-mono flex text-slate-300">
                              Description
                            </label>
                            <textarea
                              placeholder={edit.description}
                              value={description}
                              onChange={handleDescriptionChange}
                              type="text"
                              id="description"
                              rows="4"
                              class="block p-2.5 w-full text-sm font-mono text-slate-300 bg-slate-800 rounded-lg border border-gray-400 "
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center sm:justify-end sm:px-5 py-3 border-t border-slate-600 rounded-b">
                        <button
                          className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow sm:mb-2 sm:mr-5"
                          onClick={() => {
                            setPreviewImage(null);
                            handleSave();
                            setTitle("");
                            setLink("");
                            setDescription("");
                          }}
                          type="submit"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {show && (
        <form>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative  my-6 mx-3 lg:mx-auto w-11/12 sm:w-4/6 lg:w-2/4 xl:w-1/3">
              {/*content*/}
              <div className="border-0  rounded-lg shadow-lg relative flex flex-col w-full bg-slate-900 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-600 mb-2 rounded-t">
                  <h3 className="font-mono text-slate-300 text-xl md:text-3xl font-semibold">
                    Add a project
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      toggleShow();
                      setPreviewImage(null);
                      setTitle("");
                      setLink("");
                      setDescription("");
                    }}
                  >
                    <span className="bg-transparent hover:text-gray-500 opacity-70 text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                {previewImage ? (
                  <div className="flex  flex-col justify-center items-center mt-5">
                    <label
                      htmlFor="addImage"
                      className="flex justify-center items-center"
                    >
                      <img
                        className="h-32 sm:h-64 md:h-72 lg:h-80 xl:h-full w-[98%]"
                        src={previewImage}
                        alt="Preview"
                      />
                    </label>
                    <input
                      id="addImage"
                      type="file"
                      accept="image/png, image/jpeg"
                      className="cursor-pointer hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                ) : (
                  <div className="flex  items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="font-mono flex flex-col items-center justify-center w-11/12 sm:w-2/3  sm:h-64 border-3 border-sky-300 border-dotted rounded-lg cursor-pointer bg-slate-800 dark:hover:bg-slate-700  hover:bg-gray-100 "
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-400 ">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-400 ">
                          SVG, PNG, JPG or GIF
                        </p>
                      </div>
                    </label>
                    <input
                      id="dropzone-file"
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                )}

                <div className="flex flex-row justify-center">
                  <div className="flex flex-col mx-auto h-72 sm:h-88 w-11/12 sm:w-4/6 md:w-2/3">
                    <div className="flex ">
                      <label className="my-1 sm:my-2 flex justify-start font-mono text-slate-300">
                        Title
                      </label>
                      {!title && (
                        <label className="my-1 sm:my-2 flex justify-start ml-2 font-mono text-red-500">
                          ⚠
                        </label>
                      )}
                    </div>

                    <div className="flex flex-row items-center justify-center font-mono">
                      <input
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Write a title..."
                        type="text"
                        id="title"
                        className="block mb-2 w-full p-2  text-slate-300 border border-gray-300 rounded-lg bg-slate-800 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex">
                      <label className="my-1 sm:my-2 flex justify-start  font-mono text-slate-300">
                        Link
                      </label>
                      {!link && (
                        <label className="my-1 sm:my-2 flex justify-start ml-2 font-mono text-red-500">
                          ⚠
                        </label>
                      )}
                    </div>

                    <div className="flex flex-row items-center justify-center font-mono">
                      <input
                        value={link}
                        onChange={handleLinkChange}
                        placeholder="Link here (optional)"
                        type="text"
                        id="link"
                        className="block mb-2 w-full p-2 text-slate-300 border border-gray-300 rounded-lg bg-slate-800 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex">
                      <label className="my-1 sm:my-2 flex justify-start  font-mono text-slate-300">
                        Description
                      </label>
                      {!description && (
                        <label className="my-1 sm:my-2 flex justify-start ml-2 font-mono text-red-500">
                          ⚠
                        </label>
                      )}
                    </div>

                    <div className="mb-6 w-full flex flex-row items-center justify-center mx-auto font-mono">
                      <textarea
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Describe your project"
                        type="text"
                        id="description"
                        rows="4"
                        class="p-2.5 font-mono w-full text-sm text-slate-300 bg-slate-800 rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 "
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-end">
                  <button
                    className=" font-mono mt-7 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-6 mr-5"
                    onClick={handleSubmit}
                    type="submit"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </form>
      )}
    </div>
  );
};
