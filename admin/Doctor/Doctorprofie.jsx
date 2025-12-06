import { useEffect, useState } from "react";
import { Calendar, MapPin, User, Mail } from "lucide-react";
import { toast } from "react-toastify";

export default function DoctorProfile() {
  const token = localStorage.getItem("dtoken");

  const [isEdit, setIsEdit] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    image: "",
    experience: "",
    speciality: "",
    education: "",
    bio: "",
    location: "",
    fee: "",
  });

 
  const fetchProfile = async () => {
    try {
      const res = await fetch("https://bookease-backend-ju5w.onrender.com/api/doctor/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setUserData(data.doctor);
      }
    } catch (error) {
      console.log("Profile fetch error:", error);
    }
  };

 
  const handleSave = async () => {
    try {
      const res = await fetch("https://bookease-backend-ju5w.onrender.com/api/doctor/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Profile updated successfully");
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Profile update error:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
  <div className="min-h-screen bg-gray-50 py-4 md:py-8 ">
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 ">

      {/* HEADER */}
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
            My Profile
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Manage your professional information
          </p>
        </div>

        {isEdit ? (
          <button
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => setIsEdit(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

        {/* LEFT IMAGE CARD */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 text-center border border-gray-100">

            <img
              src={
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : userData.image
              }
              className="border-2 border-blue-500 object-cover shadow-sm w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4"
            />

            {isEdit && (
              <label className="mt-3 flex flex-col items-center justify-center w-full p-3 md:p-4 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:bg-blue-50">
                <span className="text-blue-600 text-sm font-medium">
                  Click to Upload Image
                </span>

                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    setImageFile(e.target.files[0])
                  }
                />
              </label>
            )}

            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mt-4">
              {userData.name}
            </h2>

            <p className="text-sm md:text-base text-gray-600">
              {userData.speciality}
            </p>
          </div>
        </div>

        {/* RIGHT DETAILS */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-4 md:p-6 border-b border-gray-100">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                Professional Information
              </h3>
            </div>

            <div className="p-4 md:p-6 space-y-5 md:space-y-6">

              {/* NAME */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  <User className="inline h-4 w-4 mr-2" />
                  Full Name
                </label>

                {isEdit ? (
                  <input
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />
                ) : (
                  <p className="text-sm md:text-base">{userData.name}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email
                </label>
                <p className="text-sm md:text-base">{userData.email}</p>
              </div>

              {/* EXPERIENCE */}
              <div>
                <label className="block text-sm font-medium">Experience</label>
                {isEdit ? (
                  <input
                    value={userData.experience}
                    onChange={(e) =>
                      setUserData({ ...userData, experience: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />
                ) : (
                  <p className="text-sm md:text-base">
                    {userData.experience} Years
                  </p>
                )}
              </div>

              {/* SPECIALITY */}
              <div>
                <label className="block text-sm font-medium">Speciality</label>
                {isEdit ? (
                  <input
                    value={userData.speciality}
                    onChange={(e) =>
                      setUserData({ ...userData, speciality: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />
                ) : (
                  <p className="text-sm md:text-base">{userData.speciality}</p>
                )}
              </div>

              {/* EDUCATION */}
              <div>
                <label className="block text-sm font-medium">Education</label>
                {isEdit ? (
                  <input
                    value={userData.education}
                    onChange={(e) =>
                      setUserData({ ...userData, education: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />
                ) : (
                  <p className="text-sm md:text-base">{userData.education}</p>
                )}
              </div>

              {/* LOCATION */}
              <div>
                <label className="block text-sm font-medium">Location</label>
                {isEdit ? (
                  <input
                    value={userData.location}
                    onChange={(e) =>
                      setUserData({ ...userData, location: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />
                ) : (
                  <p className="text-sm md:text-base">{userData.location}</p>
                )}
              </div>

              {/* FEE */}
              <div>
                <label className="block text-sm font-medium">
                  Consultation Fee
                </label>
                {isEdit ? (
                  <input
                    value={userData.fee}
                    onChange={(e) =>
                      setUserData({ ...userData, fee: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />
                ) : (
                  <p className="text-sm md:text-base">$ {userData.fee}</p>
                )}
              </div>

              {/* BIO */}
              <div>
                <label className="block text-sm font-medium">Bio</label>
                {isEdit ? (
                  <textarea
                    value={userData.bio}
                    onChange={(e) =>
                      setUserData({ ...userData, bio: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />
                ) : (
                  <p className="text-sm md:text-base">{userData.bio}</p>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
