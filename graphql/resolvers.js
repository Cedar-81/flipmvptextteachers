export const resolvers = {
  Query: {
    courses: async (parent, args, context) => {
      return await context.prisma.course.findMany();
    },

    classes: async (parent, args, context) => {
      return await context.prisma.class.findMany({
        where: {
          id: args.id,
        },
        include: {
          courses: true,
        },
      });
    },

    class: async (parent, args, context) => {
      const value = await context.prisma.class.findMany({
        where: {
          id: args.id,
        },
        include: {
          courses: true,
        },
      });
      return value.find((_class) => _class.teacherId === args.teacherId);
    },

    notes: async (parent, args, context) => {
      const value = await context.prisma.teacher_Note.findMany({
        where: {
          teacherId: args.teacherId,
        },
      });
      return value.filter(
        (_note) =>
          _note.courseId === args.courseId &&
          _note.classId.includes(args.classId) &&
          _note.category === args.noteType
      );
    },

    note: async (parent, args, context) => {
      console.log(args);
      const value = await context.prisma.teacher_Note.findUnique({
        where: {
          id: args.id,
        },
      });
      return value;
    },

    teacher: async (parent, args, context) => {
      const value = await context.prisma.teacher.findUnique({
        where: {
          id: args.teacherId,
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
    },
  },

  Mutation: {
    addTeacherNote: async (parent, { input }, context) => {
      const upadateDate = new Date();
      const newNote = {
        topic: input.topic,
        classId: input.classId,
        courseId: input.courseId,
        category: input.category,
        content: input.content,
        editableContent: input.editableContent,
        authorId: input.authorId,
        updatedAt: upadateDate,
      };

      return await context.prisma.teacher_Note.create({
        data: newNote,
      });
    },

    updateTeacherNote: async (parent, { input }, context) => {
      const upadateDate = new Date();
      const newNote = {
        topic: input.topic,
        classId: input.classId,
        courseId: input.courseId,
        category: input.category,
        content: input.content,
        editableContent: input.editableContent,
        authorId: input.authorId,
        updatedAt: upadateDate,
      };

      return await context.prisma.teacher_Note.update({
        where: {
          id: input.id,
        },
        data: newNote,
      });
    },

    shareNote: async (parent, { input }, context) => {
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
    },

    deleteTeacherNote: async (parent, { input }, context) => {
      const noteId = {
        id: input.id,
      };

      await context.prisma.teacher_Note.delete({
        where: {
          id: noteId.id,
        },
      });

      return "done";
    },

    deleteCourse: async (parent, { input }, context) => {
      const courseId = {
        id: input.id,
      };

      await context.prisma.course.delete({
        where: {
          id: courseId.id,
        },
      });
      return "done";
    },

    deleteClass: async (parent, { input }, context) => {
      const classId = {
        id: input.id,
      };

      await context.prisma.class.delete({
        where: {
          id: classId.id,
        },
      });
      return "done";
    },

    createClass: async (parent, { input }, context) => {
      const generateCode =
        Date.now().toString(36) +
        Math.floor(
          Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
        ).toString(36);
      const newClass = {
        class: input.class,
        teacherId: input.teacherId,
        classCode: generateCode,
      };
      await context.prisma.class.create({
        data: newClass,
      });

      return "Done";
    },

    createCourse: async (parent, { input }, context) => {
      await context.prisma.class.update({
        where: { id: input.classId },
        data: { courses: { create: { course: input.course } } },
      });

      return "Done";
    },

    updateTeacherProfile: async (parent, { input }, context) => {
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
          id: input.id,
        },
        data: newInfo,
      });
    },
  },
};
