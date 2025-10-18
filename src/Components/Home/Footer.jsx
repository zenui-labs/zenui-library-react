import React, {useState} from "react";

// icons
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  const date = new Date();
  const [inputValue, setInputValue] = useState("");

  const [result, setResult] = React.useState("");

  const onSubmitSubscribe = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "a60501d5-436f-454c-9d4f-a716f4d286c7");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Subscription successful! Thank you for joining us.");
      event.target.reset();
      setTimeout(()=> {
        setResult('')
      }, 4000)
    } else {
      console.log("Error", data);
    }
  };

  return (
    <footer className="w-full border-t border-gray-100 py-8 dark:bg-darkBgColor transition-all duration-500 dark:border-darkBorderColor bg-secondary ">
      <div className='max-w-[1700px] mx-auto px-8 425px:px-10'>
        <div className="w-full flex 640px:flex-row flex-col flex-wrap 1024px:gap-0 gap-8 justify-between items-start">
          <div className="w-full 640px:w-[40%] 1024px:w-[30%]">
            <img src="/footer_logo.png" alt="logo" className="w-[150px] 640px:w-[180px] my-3"/>

            <p className="dark:text-darkSubTextColor/90 text-gray-500 text-[1rem]">
              Elevate your project with free UI components, customizable icons, and a color palette. No dependencies
              required.
            </p>

            <div className="flex items-center gap-4 mt-5">
              {/*<a href="">*/}
              {/*  <FaGithub className="text-[#9caebc] text-[1.5rem]" />*/}
              {/*</a>*/}

              <a href="https://web.facebook.com/zenuilabs" target='_blank'>
                <FaFacebook
                    className="text-[#9caebc] text-[1.4rem] hover:text-[#0FABCA] transition-colors duration-300"/>
              </a>

              <a href="https://www.linkedin.com/company/zenui-labs/" target='_blank'>
                <FaLinkedin
                    className="text-[#9caebc] text-[1.4rem] hover:text-[#0FABCA] transition-colors duration-300"/>
              </a>

              <a href="https://x.com/zenuilabs" target='_blank'>
                <FaXTwitter
                    className="text-[#9caebc] text-[1.4rem] hover:text-[#0FABCA] transition-colors duration-300"/>
              </a>

              <a href="mailto:zenuilibrary@gmail.com">
                <SiGmail className="text-[#9caebc] text-[1.4rem] hover:text-[#0FABCA] transition-colors duration-300"/>
              </a>
            </div>

          </div>

          <div className="flex gap-2 flex-col mt-4">
            <h3 className="font-[600] dark:text-darkSubTextColor text-gray-600 text-[20px] capitalize">
              tools
            </h3>
            <ul className="footer font-[400] text-[#9caebc] text-[0.9rem] flex flex-col gap-2">
              <li>
                <p><a href='/shortcut-generator'>ShortKey</a></p>
                <span><a href='/shortcut-generator'>ShortKey</a></span>
              </li>
              <li>
                <p><a href='/color-palette'>Colors Palette</a></p>
                <span><a href='/color-palette'>Colors Palette</a></span>
              </li>
              <li>
                <p><a href='/icons'>Icons</a></p>
                <span><a href='/icons'>Icons</a></span>
              </li>
              <li>
                <p><a href='/config-generator'>Config AI</a></p>
                <span><a href='/config-generator'>Config AI</a></span>
              </li>
            </ul>
          </div>

          <div className="flex gap-2 flex-col mt-4">
            <h3 className="font-[600] dark:text-darkSubTextColor text-gray-600 text-[20px] capitalize">
              resources
            </h3>
            <ul className="footer font-[400] text-[#9caebc] text-[0.9rem] flex flex-col gap-2">
              <li>
                <p><a href='/templates'>Free templates</a></p>
                <span><a href='/templates'>Free templates</a></span>
              </li>
              <li>
                <p><a href='/components/all-components'>Components</a></p>
                <span><a href='/components/all-components'>Components</a></span>
              </li>
              <li>
                <p><a href='/blocks/all-blocks'>Blocks</a></p>
                <span><a href='/blocks/all-blocks'>Blocks</a></span>
              </li>
              <li>
                <p><a href='/custom-hooks'>Custom Hooks</a></p>
                <span><a href='/custom-hooks'>Custom Hooks</a></span>
              </li>
              <li>
                <p><a href='/docs/resources'>Resources</a></p>
                <span><a href='/docs/resources'>Resources</a></span>
              </li>
              <li>
                <p><a href='/semantic-tag-master'>Semantic TagMaster</a></p>
                <span><a href='/semantic-tag-master'>Semantic TagMaster</a></span>
              </li>
            </ul>
          </div>

          <div className="flex gap-2 flex-col mt-4">
            <h3 className="font-[600] dark:text-darkSubTextColor text-gray-600 text-[20px] capitalize">
              Company
            </h3>
            <ul className="footer font-[400] text-[0.9rem] text-[#9caebc] flex flex-col gap-2">
              <li>
                <p><a href='/about-us'>About Us</a></p>
                <span><a href='/about-us'>About Us</a></span>
              </li>
              {/*<li>*/}
              {/*  <p>Support</p>*/}
              {/*  <span>Support</span>*/}
              {/*</li>*/}
              <li>
                <p><a href='/privacy-policy'>Privacy policy</a></p>
                <span><a href='/privacy-policy'>Privacy policy</a></span>
              </li>
              <div className='relative'>
                <div className='w-2 h-2 animate-[ping_1.5s_linear_infinite] absolute -top-0.5 right-0 bg-green-500 rounded-full'></div>
                <li>
                  <p><a href='/zenui-hero-docs'>Become ZenUI Hero</a></p>
                  <span><a href='/zenui-hero-docs'>Become ZenUI Hero</a></span>
                </li>
              </div>
            </ul>
          </div>
          <div className="flex gap-2 flex-col mt-4">
          <h3 className="font-[600] dark:text-darkSubTextColor text-gray-600 text-[20px] capitalize">
              Join our newsletter
            </h3>

            <form onSubmit={onSubmitSubscribe}>
              <label
                  htmlFor="email"
                  className="text-[#9caebc] text-[0.9rem] mb-2"
              >
                Your Email
              </label>
              <div className="relative mt-1">
                <input
                    type="email"
                    name="email"
                    id=""
                    required
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="example@gmail.com"
                    className="py-3 pl-4 pr-[120px] border dark:border-darkBorderColor w-full bg-transparent border-gray-200 rounded-md focus:ring-0 outline-none"
                />
                <button type="submit"
                        className={`absolute top-0 h-full right-0 px-4 bg-gray-300 hover:text-white text-gray-600 hover:bg-[#0FABCA] dark:bg-slate-700 dark:text-slate-400 rounded-r-md transition-all duration-300`}>
                  Subscribe
                </button>
              </div>
            </form>
            <p className='text-[14px] text-[#0FABCA]'>{result}</p>

            <a href='https://web.facebook.com/share/g/D8DbMaprfWPksSGF/' target='_blank'
               className='p-3 cursor-pointer dark:bg-slate-800 dark:hover:bg-slate-900 bg-gray-100 rounded-md flex hover:bg-gray-200 items-center gap-[14px]'>
              <img src='https://i.ibb.co.com/vJynhGR/Facebook-Logo-2023.png'
                   alt='facebook' className='w-[30px]'/>

              <div>
                <h4 className='text-[1rem] font-[600] dark:text-darkTextColor text-gray-700'>Join Community</h4>
                <p className='text-[0.9rem] font-[300] dark:text-darkSubTextColor text-gray-700'>130+ Members</p>
              </div>
            </a>
          </div>
        </div>

        <div
            className="w-full border-t dark:border-darkBorderColor border-gray-100 flex items-center 425px:flex-row flex-col 425px:gap-0 gap-5 justify-center mt-12 pt-6">
            <p className="text-gray-400 dark:text-darkSubTextColor/70 font-normal text-center text-[0.8rem]">
                A product of <a href='https://zenui.net' target="_blank" className='text-primary'>@zenui-labs</a>
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
