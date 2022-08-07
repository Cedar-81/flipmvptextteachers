import { sign } from "jsonwebtoken";
const bcrypt = require("bcryptjs");
import Cookies from "cookies";
import isAuth from "./isAuth";
const nodemailer = require("nodemailer");

const sendEmail = async (val) => {
  let testAccount = await nodemailer.createTestAccount();
  var smtpTransport = require("nodemailer-smtp-transport");
  console.log(
    process.env.NEXT_PUBLIC_APP_EMAIL,
    process.env.NEXT_PUBLIC_APP_PASSWORD
  );
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: `${process.env.NEXT_PUBLIC_APP_EMAIL}`, // generated ethereal user
        pass: `${process.env.NEXT_PUBLIC_APP_PASSWORD}`, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Flip Classroom" <readatetech@gmail.com>`, // sender address
    to: `${val.to_email}`, // list of receivers
    subject: "Flip Classroom Email Verification", // Subject line
    // text: "Hello world?", // plain text body
    html: `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,600;1,700;1,800;1,900&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Roboto:wght@300&display=swap"
      rel="stylesheet"
    />
    <title>Flip Classroom Email Verification</title>
  </head>
  <body style="font-family: 'Fira Sans', sans-serif">
    <div
      style="
        height: max-content;
        width: 100%;
        background-color: rgb(27, 27, 27);
        text-align: center;
        color: white;
        padding: 2rem 0;
      "
    >
      <h2 style="">Email Verification</h2>
      <h3 style="width: 90%; margin: auto; font-size: small">
        This is an email verification code from flip classroom, if you didn't
        signup for this please ignore
      </h3>
      <p style="font-size: 50px">Code: ${val.message}</p>
    </div>
  </body>
</html>`, // html body
  });
};

export const resolvers = {
  Query: {
    courses: async (parent, args, context) => {
      const { verified, payload } = isAuth(context.req);
      if (verified) {
        return await context.prisma.course.findMany();
      } else {
        return "unauthorized";
      }
    },

    classes: async (parent, args, context) => {
      const { verified, payload } = isAuth(context.req);
      if (verified) {
        return await context.prisma.class.findMany({
          where: {
            id: args.id,
          },
          include: {
            courses: true,
          },
        });
      } else {
        return "unauthorized";
      }
    },

    class: async (parent, args, context) => {
      const { verified, payload } = isAuth(context.req);
      if (verified) {
        const value = await context.prisma.class.findMany({
          where: {
            id: args.id,
          },
          include: {
            courses: true,
          },
        });
        return value.find((_class) => _class.teacherId === payload.teacherId);
      } else {
        return "unauthorized";
      }
    },

    notes: async (parent, args, context) => {
      const { verified, payload } = isAuth(context.req);
      if (verified) {
        const value = await context.prisma.teacher_Note.findMany({
          where: {
            authorId: payload.teacherId,
          },
        });
        return value.filter(
          (_note) =>
            _note.courseId === args.courseId &&
            _note.classId.includes(args.classId) &&
            _note.category === args.noteType
        );
      } else {
        return "unauthorized";
      }
    },

    note: async (parent, args, context) => {
      const { verified, payload } = isAuth(context.req);
      if (verified) {
        const value = await context.prisma.teacher_Note.findUnique({
          where: {
            id: args.id,
          },
        });
        return value;
      } else {
        return "unauthorized";
      }
    },

    teacher: async (parent, args, context) => {
      const { verified, payload } = isAuth(context.req);
      if (verified) {
        const value = await context.prisma.teacher.findUnique({
          where: {
            id: payload.teacherId,
          },
          include: {
            classes: {
              include: {
                courses: true,
              },
            },
          },
        });
        return value;
      } else {
        return "unauthorized";
      }
    },

    auth: async (parent, args, context) => {
      const { verified, payload } = isAuth(context.req);
      console.log("vf", verified);
      if (verified) {
        return "authorized";
      } else {
        return "unauthorized";
      }
    },
  },

  Mutation: {
    addTeacherNote: async (parent, { input }, context) => {
      const { verified, payload } = isAuth(context.req);
      if (verified) {
        const upadateDate = new Date();
        const newNote = {
          topic: input.topic,
          classId: input.classId,
          courseId: input.courseId,
          category: input.category,
          content: input.content,
          editableContent: input.editableContent,
          authorId: payload.teacherId,
          updatedAt: upadateDate,
        };

        return await context.prisma.teacher_Note.create({
          data: newNote,
        });
      } else {
        return "unauthorized";
      }
    },

    updateTeacherNote: async (parent, { input }, context) => {
      const { verified, payload } = isAuth(context.req);
      if (verified) {
        const upadateDate = new Date();
        const newNote = {
          topic: input.topic,
          classId: input.classId,
          courseId: input.courseId,
          category: input.category,
          content: input.content,
          editableContent: input.editableContent,
          authorId: payload.teacherId,
          updatedAt: upadateDate,
        };

        return await context.prisma.teacher_Note.update({
          where: {
            id: input.id,
          },
          data: newNote,
        });
      } else {
        return "unauthorized";
      }
    },

    shareNote: async (parent, { input }, context) => {
      const { verified, payload } = isAuth(context.req);
      if (verified) {
        const data = {
          available: input.available,
        };

        await context.prisma.teacher_Note.update({
          where: {
            id: input.id,
          },
          data,
        });

        return "done";
      } else {
        return "unauthorized";
      }
    },

    deleteTeacherNote: async (parent, { input }, context) => {
      const { verified, payload } = isAuth(context.req);
      if (verified) {
        const noteId = {
          id: input.id,
        };

        await context.prisma.teacher_Note.delete({
          where: {
            id: noteId.id,
          },
        });

        return "done";
      } else {
        return "unauthorized";
      }
    },

    deleteCourse: async (parent, { input }, context) => {
      const { verified, payload } = isAuth(context.req);
      if (verified) {
        const courseId = {
          id: input.id,
        };

        await context.prisma.course.delete({
          where: {
            id: courseId.id,
          },
        });
        return "done";
      } else {
        return "unauthorized";
      }
    },

    deleteClass: async (parent, { input }, context) => {
      const { verified, payload } = isAuth(context.req);
      if (verified) {
        const classId = {
          id: input.id,
        };

        await context.prisma.class.delete({
          where: {
            id: classId.id,
          },
        });
        return "done";
      } else {
        return "unauthorized";
      }
    },

    createClass: async (parent, { input }, context) => {
      const { verified, payload } = isAuth(context.req);
      if (verified) {
        const generateCode =
          Date.now().toString(36) +
          Math.floor(
            Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
          ).toString(36);
        const newClass = {
          class: input.class,
          teacherId: payload.teacherId,
          classCode: generateCode,
        };
        await context.prisma.class.create({
          data: newClass,
        });

        return "Done";
      } else {
        return "unauthorized";
      }
    },

    createCourse: async (parent, { input }, context) => {
      const { verified, payload } = isAuth(context.req);
      if (verified) {
        await context.prisma.class.update({
          where: { id: input.classId },
          data: { courses: { create: { course: input.course } } },
        });

        return "Done";
      } else {
        return "unauthorized";
      }
    },

    updateTeacherProfile: async (parent, { input }, context) => {
      const { verified, payload } = isAuth(context.req);
      if (verified) {
        const upadateDate = new Date();
        const newInfo = {
          firstName: input.firstName,
          lastName: input.lastName,
          address: input.address,
          state: input.state,
          country: input.category,
          postalCode: input.postalCode,
          email: input.email,
          image: input.image,
          phoneNo: input.phoneNo,
          updatedAt: upadateDate,
          password: input.password,
        };

        return await context.prisma.teacher.update({
          where: {
            id: payload.teacherIdd,
          },
          data: newInfo,
        });
      } else {
        return "unauthorized";
      }
    },

    createTeacher: async (parent, { input }, context) => {
      const generateCode =
        Date.now().toString(36) +
        Math.floor(
          Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
        ).toString(36);
      const upadateDate = new Date();
      const password = input.password;
      const hashedPassword = await bcrypt.hash(password, 12);
      const info = {
        firstName: input.firstName,
        lastName: input.lastName,
        address: input.address,
        state: input.state,
        country: input.country,
        postalCode: input.postalCode,
        email: input.email,
        image: input.image,
        phoneNo: input.phoneNo,
        emailCode: generateCode,
        updatedAt: upadateDate,
        password: hashedPassword,
      };
      try {
        const val = await context.prisma.teacher.create({
          data: info,
        });
        const emailval = {
          to_email: input.email,
          message: generateCode,
        };
        try {
          sendEmail(emailval);
        } catch (error) {
          console.log(error);
        }
        return "Successful";
      } catch (e) {
        console.log(e);
        return "Duplicate Email";
      }
    },

    verifyEmail: async (parent, { input }, context) => {
      try {
        try {
          await context.prisma.teacher.update({
            where: {
              emailCode: input.code,
            },
            data: {
              verifiedEmail: true,
            },
          });
          return "Verified";
        } catch (error) {
          return "Failed";
        }
      } catch (e) {
        return "Failed";
      }
    },

    signIn: async (parent, { input }, context) => {
      const cookies = new Cookies(context.req, context.res, { secure: true });
      let cookieDate = new Date();
      cookieDate.setTime(cookieDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      cookieDate.toUTCString();
      const env = process.env.NODE_ENV;
      try {
        const val = await context.prisma.teacher.findUnique({
          where: {
            email: input.email,
          },
        });
        const verifyPassword = await bcrypt.compare(
          input.password,
          val.password
        );
        console.log(val, verifyPassword);
        if (val && val.verifiedEmail === false) return "Unverified Email";
        if (val == null || verifyPassword === false) {
          console.log("here");
          return "Failed";
        } else {
          const access = (key, exp) => {
            console.log(
              "🚀 ~ file: resolvers.js ~ line 377 ~ access ~ id",
              val.id
            );
            return sign({ teacherId: val.id }, key, {
              expiresIn: exp,
            });
          };

          cookies.set(
            "flip_classroom_auth_teachers",
            access(`${process.env.NEXT_PUBLIC_JWT_COOKIE_TOKEN}`, "7d"),
            {
              httpOnly: true,
              path: "/",
              expires: cookieDate,
              sameSite: "strict",
              secure: process.env.NODE_ENV === "production" ? true : false,
            }
          );
          console.log(isAuth(context.req));
          return "Verified";
        }
      } catch (e) {
        return "Failed";
      }
    },
  },
};
