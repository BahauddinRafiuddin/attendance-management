import React from "react";
import { useState } from "react";
import InputField from "../../components/InputField";
import { assest } from "../../assets/assest";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import Loading from "../../components/Loading";

const AddSubject = () => {
  const { navigate, axios, setSubjectUpdated } = useAppContext();
  const [loading, setLoading] = useState(false);

  const [subject, setSubject] = useState({
    name: "",
    code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, code } = subject;
    const adminToken = localStorage.getItem("adminToken"); // Get admin token
    axios.defaults.headers.common["Authorization"] = `Bearer ${adminToken}`;
    try {
      const { data } = await axios.post("/api/admin/add-subject", {
        name,
        code,
      });
      if (data.success) {
        toast.success("Subject Added Successfully");
        setSubjectUpdated((prev) => !prev);
        navigate("/admin/subjects");
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loading />}
      <div className="mt-16 pb-16">
        <p className="text-2xl md:text-3xl text-gray-500">
          Add New <span className="font-semibold text-primary">Subject</span>
        </p>

        <div className="flex flex-col-reverse lg:flex-row justify-around mt-5 items-center ">
          {/* Left Part Form */}
          <div className="flex-1 max-w-md">
            <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  handleChange={handleChange}
                  data={subject}
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                />
                <InputField
                  handleChange={handleChange}
                  data={subject}
                  name="code"
                  type="text"
                  placeholder="Email Subject Code"
                />
              </div>

              <button className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase">
                + Add Subject
              </button>
            </form>
          </div>
          {/* Right Part Image */}
          <div className="flex items-center ">
            <img
              className="md:mr-16 mb-16 md:mt-0 w-100 h-100"
              src={assest.addSubject}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSubject;
