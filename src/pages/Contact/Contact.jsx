import React, { useState } from "react";
import emailjs from "emailjs-com";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineDownload,
  AiOutlineInstagram,
  AiOutlineMail,
} from "react-icons/ai";
import { Button, Input, Textarea } from "../../components/form";
import { Page } from "../../components/Page";
import { blue, green, pink, red, yellow } from "../../utils";
import {
  ContactForm,
  ContactWrapper,
  DownloadButton,
  IconButton,
} from "./Contact.styled";

export const Contact = () => {
  const [form, setFormState] = useState({ name: "", email: "", message: "" });

  const sendEmail = (e) => {
    e.preventDefault();

    // Replace these values with your emailjs service ID, template ID, and user ID
    const serviceId = "service_xzalsog";
    const templateId = "template_wfryh2j";
    const userId = "to26yV9jr_Ca4BXVh";

    // Reference the form element by its ID
    const formElement = document.getElementById("contactform");

    emailjs.sendForm(serviceId, templateId, formElement, userId).then(
      (response) => {
        alert("Email sent successfully:");
        // Reset form fields after successful submission
        setFormState({ name: "", email: "", message: "" });
      },
      (error) => {
        console.error("Email could not be sent:", error);
      }
    );
  };

  return (
    <Page header="Contact">
      <ContactWrapper>
        <ContactForm
          action="https://formspree.io/f/mbjbvlpv"
          method="POST"
          name="contact"
          id="contactform"
        >
          <Input
            placeholder="Name"
            type="text"
            name="user_name"
            onChange={(e) => {
              setFormState((prev) => ({ ...prev, name: e.target.value }));
            }}
            value={form.name}
          />
          <Input
            placeholder="Email"
            type="email"
            name="user_mail"
            onChange={(e) => {
              setFormState((prev) => ({ ...prev, email: e.target.value }));
            }}
            value={form.email}
          />
          <Textarea
            lines={15}
            placeholder="Hi! How are you?"
            name="message"
            onChange={(e) => {
              setFormState((prev) => ({ ...prev, message: e.target.value }));
            }}
            value={form.message}
          />
        </ContactForm>
        <div className="buttons">
          <div className="socials">
            <a
              href="https://www.linkedin.com/in/nishanth-spk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton bg={blue}>
                <AiFillLinkedin size={40} />
              </IconButton>
            </a>

            <a href="mailto:spknishanth2004@gmail.com">
              <IconButton bg={green}>
                <AiOutlineMail size={40} />
              </IconButton>
            </a>

            <a
              href="https://github.com/nishanthspk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton bg={yellow}>
                <AiFillGithub size={40} />
              </IconButton>
            </a>

            <a
              href="https://drive.google.com/drive/folders/1IVWhMyEghjmHPRaM09KqiKTC5ruCtmZR"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadButton bg={red} tooltip="Download">
                <AiOutlineDownload size={40} />
                <span>Resume</span>
              </DownloadButton>
            </a>
          </div>
          <Button
            disabled={
              form.email.length <= 0 ||
              form.name.length <= 0 ||
              form.message.length <= 0
            }
            onClick={(e) => {
              sendEmail(e);
            }}
          >
            Submit
          </Button>
        </div>
      </ContactWrapper>
    </Page>
  );
};
