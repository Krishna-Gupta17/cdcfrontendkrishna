import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import placeholder from "../assets/blogs/placeholder.png";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
import navbarleft from '../assets/navbar/navbarleft.png';
import axios from "axios";
import editicon from "../assets/edit.jpg"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const MemberProfile = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showAddForm, setAddForm] = useState(false);
  const [formData, setFormData] = useState({
    memberName: '',
    memberImage: null,
    memberBio: '',
    linkedin: '',
    github: ''
  });
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    images: null,
    description: '',
  });

  useEffect(() => {
    axios.get(`http://127.0.0.1:4200/members/${id}`)
      .then((res) => {
        const data = res.data.body;
        setMember(data);
        setBlogs(res.data.blogs || []);
        setFormData({
          memberName: data.memberName || '',
          memberImage: null,
          memberBio: data.memberBio || '',
          linkedin: data.memberSocial?.linkedin || '',
          github: data.memberSocial?.github || ''
        });
      })
      .catch((err) => {
        console.error('Error loading member:', err);
      });
  }, [id]);

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("title", blogData.title);
      form.append("description", blogData.description);
      form.append("content", blogData.content);
      
      if (blogData.images) {
        form.append("image", blogData.images);
      }

      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log("Blog added:", res.data);

      // Update the blogs list with the new blog
      setBlogs(prev => [...prev, res.data.blog]);
      setAddForm(false);

      // Reset form
      setBlogData({
        title: '',
        content: '',
        images: null,
        description: '',
      });
       window.location.reload(true);
    } catch (err) {
      console.error("error:", err);
      alert("Failed to add blog. Please try again.");
    }
  };

  const handleBlogChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      setBlogData(prev => ({
        ...prev,
        images: files[0] || null
      }));
    } else {
      setBlogData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "memberImage") {
      setFormData(prev => ({
        ...prev,
        memberImage: files[0] || null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();

      // Only append non-empty values
      if (formData.memberName.trim()) {
        form.append("memberName", formData.memberName.trim());
      }
      if (formData.memberBio.trim()) {
        form.append("memberBio", formData.memberBio.trim());
      }
      if (formData.linkedin.trim()) {
        form.append("linkedin", formData.linkedin.trim());
      }
      if (formData.github.trim()) {
        form.append("github", formData.github.trim());
      }
      if (formData.memberImage) {
        form.append("memberImage", formData.memberImage);
      }

      const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/members/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log("Profile updated:", res.data);

      setMember(res.data.member);
      setShowForm(false);

      setFormData({
        memberName: res.data.member.memberName || '',
        memberImage: null,
        memberBio: res.data.member.memberBio || '',
        linkedin: res.data.member.memberSocial?.linkedin || '',
        github: res.data.member.memberSocial?.github || ''
      });

    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (!member) return <p className="text-white px-6">Loading...</p>;

  return (
    <>
      <div className="relative">
        <div className="bg-transparent font-inter text-white mt-6 mx-4 md:mx-16 rounded-2xl p-6 md:p-8">
          <div className="flex w-full flex-row md:flex-row gap-6 md:gap-20 items-start md:items-start">
            <div className="w-full md:w-2/5 flex flex-row items-start md:justify-start">
              <img
                src={member.memberImage || placeholder}
                alt="member profile"
                className="rounded-md w-50px h-50px md:w-60 md:h-60 object-cover"
              />
            </div>
            <div className="flex justify-center flex-col md:space-y-4 space-y-2">
              <h3 className="font-inter font-semibold text-xl md:text-3xl">{member.memberName}</h3>
              <h4 className="text-gray-500 font-inter text-lg md:text-xl">{member.memberRole}</h4>

              <div className="w-full md:w-full space-y-2 mt-4 md:mt-0 md:space-y-3">
                <p className="text-gray-500 text-sm md:text-base">
                  {member.memberBio || member.description}
                </p>

                {/* Social Links */}
                <div className="flex gap-4 mt-2">
                  {member.memberSocial?.linkedin && (
                    <a
                      href={member.memberSocial.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      LinkedIn
                    </a>
                  )}
                  {member.memberSocial?.github && (
                    <a
                      href={member.memberSocial.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-300"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 left-0 h-80 rounded-full opacity-10 -z-10 blur-md">
          <img src={navbarleft} alt="Left" className="h-full" />
        </div>
        <div className="absolute top-64 rotate-180 right-0 h-80 rounded-full opacity-10 -z-10 blur-md">
          <img src={navbarleft} alt="Left" className="h-full" />
        </div>

        <div className="text-white font-inter font-bold ml-4 mr-4 px-4 mb-9 md:ml-16 md:mr-16 md:pl-8 md:pr-8 md:mb-10">
          <div className="flex items-center justify-between">
            <h4 className="text-xl">Blogs and posts</h4>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowForm(prev => !prev)}
                className="flex items-center gap-2 px-2 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium"
                title="Edit Profile"
              >
                <img src={editicon} alt="edit" className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => setAddForm(prev => !prev)}
                className="flex items-center gap-2 px-2 py-1 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white font-medium"
                title="Add Blog"
              >
                <span className="text-xl">+</span>
              </button>
            </div>
          </div>
          <div className="h-[2px] w-full bg-yellow-200 mt-5 rounded-full shadow-[0_4px_12px_rgba(250,204,21,0.5)]" />
        </div>

        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-4 mr-4 md:ml-16 md:mr-16 md:px-8 px-4">
            {blogs.map((blog, i) => (
             <Link to={`/members/blog/${blog._id}`} key={i}>
              <BlogCard key={blog._id || i} {...blog} />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-white px-6 text-center">No blogs available.</p>
        )}

        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setAddForm(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
              >
                X
              </button>
              
              <h2 className="text-white text-xl font-bold mb-6">Create New Blog</h2>
              
              <form onSubmit={handleCreateBlog} className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={blogData.title}
                    onChange={handleBlogChange}
                    placeholder="Enter blog title"
                    required
                    className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Description</label>
                  <textarea
                    name="description"
                    value={blogData.description}
                    onChange={handleBlogChange}
                    placeholder="Enter blog description"
                    rows="3"
                    className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Featured Image</label>
                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    onChange={handleBlogChange}
                    className="w-full px-4 py-2 rounded-md bg-gray-800 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Content</label>
                  <div className="bg-white rounded-md">
                    <ReactQuill
                      value={blogData.content}
                      onChange={(content) =>
                        setBlogData((prev) => ({ ...prev, content }))
                      }
                      placeholder="Write your blog content here..."
                      theme="snow"
                      style={{ height: '200px', marginBottom: '50px' }}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setAddForm(false)}
                    className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Create Blog
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative">
              <form
                onSubmit={handleProfileUpdate}
                className="w-full max-w-[500px] bg-white/10 border border-white/30 backdrop-blur-md rounded-lg p-6 space-y-4"
              >
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 text-white hover:text-red-500 text-xl font-bold"
                >
                  ×
                </button>

                <h2 className="text-white text-xl font-bold mb-4 pt-4">Edit Profile</h2>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
                  <div className="w-full">
                    <label className="block mb-1 text-base text-white">Name</label>
                    <input
                      type="text"
                      name="memberName"
                      value={formData.memberName}
                      onChange={handleChange}
                      placeholder="Name"
                      className="w-full sm:w-[216px] h-[38px] px-4 py-2 rounded-lg placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-base text-white">Profile Image</label>
                  <input
                    type="file"
                    name="memberImage"
                    onChange={handleChange}
                    accept="image/*"
                    className="w-full sm:w-[474px] h-[38px] px-4 py-2 rounded-lg placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none text-white"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-base text-white">BIO</label>
                  <textarea
                    name="memberBio"
                    value={formData.memberBio}
                    onChange={handleChange}
                    placeholder="Bio"
                    rows="3"
                    className="w-full sm:w-[474px] px-4 py-2 rounded-lg placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none text-white resize-vertical"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-base text-white">LinkedIn Handle</label>
                  <input
                    type="text"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="Enter LinkedIn handle"
                    className="w-full sm:w-[474px] h-[38px] px-4 py-2 rounded-lg placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none text-white"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-base text-white">GitHub Handle</label>
                  <input
                    type="text"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="Enter GitHub handle"
                    className="w-full sm:w-[474px] h-[38px] px-4 py-2 rounded-lg placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none text-white"
                  />
                </div>

                <div className="flex flex-col items-center mt-6 w-full">
                  <button
                    type="submit"
                    className="w-full sm:w-[248px] h-[44px] rounded-lg bg-gradient-to-r from-[#4C4FB6] to-[#2C2D88] text-white font-semibold flex items-center justify-center mx-auto lg:mx-auto hover:from-[#5C5FC6] hover:to-[#3C3D98] transition-all duration-200"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MemberProfile;