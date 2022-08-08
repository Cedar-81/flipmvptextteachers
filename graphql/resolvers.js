import { sign } from "jsonwebtoken";
const bcrypt = require("bcryptjs");
import Cookies from "cookies";
import isAuth from "./isAuth";
import sendEmail from "./sendEmail";

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
