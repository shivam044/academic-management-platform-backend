import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Academic Management API',
    version: '1.0.0',
    description: 'API Documentation for Academic Management Platform',
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Backend Server',
    },
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        required: ['userName', 'firstName', 'lastName', 'email', 'password'],
        properties: {
          userName: {
            type: 'string',
            description: 'The user\'s username',
          },
          firstName: {
            type: 'string',
            description: 'The user\'s first name',
          },
          lastName: {
            type: 'string',
            description: 'The user\'s last name',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'The user\'s email address',
          },
          password: {
            type: 'string',
            description: 'The user\'s password',
          },
          role: {
            type: 'string',
            description: 'The role of the user (e.g., student, teacher)',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'The date when the user was created',
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            description: 'The date when the user was last updated',
          },
        },
        example: {
          userName: 'johndoe',
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
          password: 'password123',
          role: 'student',
        },
      },
      Subject: {
        type: 'object',
        required: ['subjectTitle', 'uid'],
        properties: {
          subjectTitle: {
            type: 'string',
            description: 'The title of the subject',
          },
          targetGrade: {
            type: 'number',
            description: 'The target grade for the subject',
          },
          uid: {
            type: 'string',
            description: 'Reference to the student user ID',
          },
          t_uid: {
            type: 'string',
            description: 'Reference to the teacher user ID',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'The date when the subject was created',
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            description: 'The date when the subject was last updated',
          },
        },
        example: {
          subjectTitle: 'Mathematics',
          targetGrade: 90,
          uid: '60d0fe4f5311236168a109ca',
          t_uid: '60d0fe4f5311236168a109cb',
        },
      },
      Grade: {
        type: 'object',
        required: ['grade', 's_id', 'uid'],
        properties: {
          grade: {
            type: 'number',
            description: 'The grade value',
          },
          s_id: {
            type: 'string',
            description: 'Reference ID to the Subject',
          },
          a_id: {
            type: 'string',
            description: 'Reference ID to the Assignment',
          },
          uid: {
            type: 'string',
            description: 'Reference to the student user ID',
          },
          notes: {
            type: 'string',
            description: 'Extra notes for information',
          },
          date: {
            type: 'string',
            format: 'date-time',
            description: 'The date when the grade was recorded',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'The date when the grade was created',
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            description: 'The date when the grade was last updated',
          },
        },
        example: {
          grade: 85,
          s_id: '60d0fe4f5311236168a109cc',
          a_id: '60d0fe4f5311236168a109cd',
          uid: '60d0fe4f5311236168a109ca',
          notes: 'Well done on the assignment',
          date: '2023-08-01T00:00:00.000Z',
        },
      },
      Assignment: {
        type: 'object',
        required: ['name', 's_id', 'uid'],
        properties: {
          name: {
            type: 'string',
            description: 'The name of the assignment',
          },
          s_id: {
            type: 'string',
            description: 'Reference to the Subject',
          },
          uid: {
            type: 'string',
            description: 'Reference to the student user ID',
          },
          g_id: {
            type: 'string',
            description: 'Reference to the Grade for Grades',
          },
          due_date: {
            type: 'string',
            format: 'date-time',
            description: 'The due date of the assignment',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'The date when the assignment was created',
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            description: 'The date when the assignment was last updated',
          },
        },
        example: {
          name: 'Math Homework 1',
          s_id: '60d0fe4f5311236168a109cc',
          uid: '60d0fe4f5311236168a109ca',
          g_id: '60d0fe4f5311236168a109ce',
          due_date: '2023-09-01T00:00:00.000Z',
        },
      },
    },
  },
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], // Path to your API files (update as per your project structure)
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
