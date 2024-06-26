import { useSignup } from "../hooks/useSignup";
import { useState, useEffect } from 'react';
import sidePicture from "../assets/Wavy_Bus-03_Single-06.png";
import tLetterLogo from "../assets/t_letter.png";
import { Link } from 'react-router-dom';

// import '../style/LoginandSignup.css';

// This component includes form fields for first name, last name, email, and password,
// along with submit functionality. It also provides a link to navigate to the sign-in page
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState(""); // Corrected state for first name
  const [lastName, setLastName] = useState(""); // Added state for last name
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, firstName + " " + lastName);
  };

  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize state based on user's system preference or a default value
    return (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  // Effect to apply class to html and save preference
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
      {/* Use flex-col for smaller screens and flex-row for larger screens */}
      <div className="flex flex-col lg:flex-row min-h-screen text-xs sm:text-sm xl:text-base">
        {/* Form Container: Allow it to grow and shrink as needed, giving more flexibility in layout */}
        <div className="flex flex-1 flex-col justify-center p-6 lg:p-8">
          <div className="mx-auto w-full max-w-md space-y-8">
            <Link to={"/"}>
              <img
                className="mx-auto h-20 w-auto" // Adjusted the size for a more balanced look
                src={tLetterLogo}
                alt="Your Company"
              />
            </Link>
            <h2 className="mt-2 text-center text-2xl font-bold text-gray-900 dark:text-gray-200">
              Sign up to TicTacTask
            </h2>
            {/* Sign In Form */}
            <form
              className="mt-8 space-y-6"
              onSubmit={handleSubmit}
              method="POST"
            >
              <div className="flex justify-between gap-4">
                {/* First Name Field */}
                <div className="flex-1">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-900 dark:text-gray-200"
                  >
                    First Name *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      id="first-name"
                      name="first-name"
                      autoComplete="given-name"
                      required
                      className="appearance-none block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Last Name Field */}
                <div className="flex-1">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-900 dark:text-gray-200"
                  >
                    Last Name *
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      id="last-name"
                      name="last-name"
                      type="text" // Changed to 'text' since it's for a name, not an email
                      autoComplete="family-name"
                      required
                      className="appearance-none block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900 dark:text-gray-200"
                >
                  Email address *
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-900 dark:text-gray-200"
                  >
                    Password *
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple-700 py-2 px-4 text-sm font-medium text-white hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign up
                </button>
                {error && <div className="error">{error}</div>}
              </div>
            </form>

            {/* Sign Up Link */}
            <p className="mt-2 text-center text-sm text-gray-600  dark:text-gray-400">
              Already have an account?{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                <Link to={"/login"}>Sign in</Link>
              </a>
            </p>

            <div className="flex justify-center items-center">
              <button onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
                <div className="w-10 h-5 bg-slate-300 rounded-full px-0.5 dark:bg-slate-700/[.3] relative flex items-center dark:justify-end">
                  <div className="w-4 h-4 rounded-full bg-violet-600 absolute"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Image Container: Hide on smaller screens and show on larger screens */}
        <div className="hidden lg:flex flex-1 items-center justify-center bg-purple-700">
          <img src={sidePicture} className="max-w-full h-auto" alt="Sign In" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
