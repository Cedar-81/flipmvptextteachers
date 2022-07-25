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
  }

  type Mutation {
    addTeacherNote(input: addTeacherNoteInput): Teacher_Note!
    updateTeacherNote(input: updateTeacherNoteInput): Teacher_Note!
    updateTeacherProfile(input: updateTeacherProfileInput): Teacher!
    deleteTeacherNote(input: deleteTeacherNoteInput): String
  }

  type Class {
    id: String!
    class: String
    teacherId: String!
    courses: [Course]
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
    classId: [String!]!
    courseId: String!
    category: String
    content: String
    editableContent: String
    authorId: String
    updatedAt: String
  }

  type Course {
    id: String!
    course: String
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
    classId: [String]
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

  input updateTeacherNoteInput {
    id: String!
    topic: String
    classId: [String]
    courseId: String
    category: String
    content: String
    editableContent: String
    authorId: String
    updatedAt: String
  }
`;
