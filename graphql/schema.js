import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    teacher(teacherId: ID!): Teacher
    classes(teacherId: ID!): [Class]!
    class(id: ID!, teacherId: ID!): Class
    notes(
      authorId: ID!
      courseId: ID!
      classId: ID!
      noteType: String!
    ): [Teacher_Note]!
    note(id: ID!): Teacher_Note
    courses: [Course]!
    auth: String
  }

  type Mutation {
    addTeacherNote(input: addTeacherNoteInput): Teacher_Note!
    updateTeacherNote(input: updateTeacherNoteInput): Teacher_Note!
    updateTeacherProfile(input: updateTeacherProfileInput): Teacher!
    deleteTeacherNote(input: deleteTeacherNoteInput): String
    createClass(input: createClassInput): String
    createCourse(input: createCourseInput): String
    deleteClass(input: deleteClassInput): String
    deleteCourse(input: deleteCourseInput): String
    shareNote(input: shareNoteInput): String
    createTeacher(input: createTeacherInput): String
    verifyEmail(input: verifyEmailInput): String
    signIn(input: signInInput): String
  }

  type Class {
    id: String!
    class: String
    teacherId: String!
    courses: [Course]
    classCode: String
  }

  type Teacher {
    id: String!
    firstName: String
    lastName: String
    address: String
    state: String
    country: String
    postalCode: String
    email: String
    image: String
    phoneNo: String
    classes: [Class]!
    updatedAt: String
    password: String
  }

  type Teacher_Note {
    id: String!
    topic: String
    classId: String
    courseId: String!
    category: String
    content: String
    editableContent: String
    available: Boolean
    authorId: String
    updatedAt: String
  }

  type Course {
    id: String!
    course: String
  }

  input createTeacherInput {
    firstName: String
    lastName: String
    address: String
    state: String
    country: String
    postalCode: String
    email: String
    image: String
    dateOfBirth: String
    phoneNo: String
    class: String
    emailCode: String
    updatedAt: String
    password: String
  }

  input signInInput {
    email: String!
    password: String!
  }

  input verifyEmailInput {
    code: String!
  }

  input updateTeacherProfileInput {
    id: String!
    firstName: String
    lastName: String
    address: String
    state: String
    country: String
    postalCode: String
    email: String
    image: String
    phoneNo: String
    updatedAt: String
    password: String
  }

  input addTeacherNoteInput {
    topic: String
    classId: String
    courseId: String
    category: String
    content: String
    editableContent: String
    authorId: String
    updatedAt: String
  }

  input deleteTeacherNoteInput {
    id: String!
  }

  input deleteClassInput {
    id: String!
  }

  input deleteCourseInput {
    id: String!
  }

  input createClassInput {
    class: String
    teacherId: String
    classCode: String
  }

  input createCourseInput {
    classId: String
    course: String
  }

  input shareNoteInput {
    id: String
    available: Boolean
  }

  input updateTeacherNoteInput {
    id: String!
    topic: String
    classId: String
    courseId: String
    category: String
    content: String
    editableContent: String
    authorId: String
    available: Boolean
    updatedAt: String
  }
`;
