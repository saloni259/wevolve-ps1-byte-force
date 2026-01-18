# Wevolve - Skill Matching & Job Portal

## Problem Statement Chosen
**Byte Force Problem Statement 1**: Developing a seamless job matching and candidate management platform where candidates can register, update their profiles, and receive automated job matches based on their skills, experience, and preferences.

## Setup Instructions
Follow these steps to set up the project locally:

### 1. Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance

### 2. Clone the Repository
```bash
git clone <repository-url>
cd wevolve-ps1-sample-byte_force
```

### 3. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` root:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   CORS_ORIGIN=http://localhost:5173
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRY=10d
   ```

### 4. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## How to Run
To run both the backend and frontend simultaneously, open two terminals:

### Terminal 1: Backend
```bash
cd backend
npm run dev
```

### Terminal 2: Frontend
```bash
cd frontend
npm run dev
```
The application will be available at `http://localhost:5173`.

## Tech Stack Used
- **Frontend**: React (Vite), Axios, Framer Motion, Lucide-React, React Hot Toast, React Router DOM.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose.
- **Authentication**: JWT (JSON Web Tokens) with refresh/access token logic and HTTP-only cookies.
- **Styling**: Vanilla CSS with a modern Glassmorphism aesthetic.

## API Documentation

### User Routes
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/api/v1/user/register` | POST | Register a new candidate (JSON) | No |
| `/api/v1/user/login` | POST | Authenticate user & get tokens | No |
| `/api/v1/user/logout` | POST | Clear user session & cookies | Yes |
| `/api/v1/user/update` | POST | Update candidate profile details | Yes |
| `/api/v1/user/match` | POST | Calculate matching score for a job | Yes |

### Job Routes
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/api/v1/job/all` | GET | Fetch all available jobs | Yes |
| `/api/v1/job/add` | POST | Add a new job (Admin/Recruiter) | No |

## Design Decisions and Approach
- **Pure JSON Communication**: Switched from `multipart/form-data` to pure JSON payloads to ensure strict data validation and simplify frontend-backend connectivity.
- **Centralized Auth Context**: Implemented a React Context provider to manage global authentication state, tokens, and persistent user sessions via `localStorage`.
- **Matching Algorithm**: Implemented a weighted scoring system in the backend that calculates matches based on:
    - Skills (40%)
    - Location (20%)
    - Salary (15%)
    - Experience (15%)
    - Role (10%)
- **Glassmorphism UI**: Focused on a premium, transparent design language with smooth animations for a modern user experience.

## Challenges Faced and Solutions
- **CORS Configuration**: Encountered preflight request blocks due to port mismatches. **Solution**: Updated the backend `CORS_ORIGIN` to explicitly match the Vite dev server port.
- **Payload Inconsistency**: The backend was using Multer middleware for JSON requests, causing issues with some clients. **Solution**: Removed `upload.none()` from routes where it wasn't needed to support native JSON parsing.
- **Token Persistence**: Ensuring the user remains logged in after registration. **Solution**: Updated the registration controller to return the `accessToken` immediately, allowing the frontend to store it in `localStorage`.

## Known Limitations
- Matching is currently literal (string matching for skills); doesn't support semantic similarity.
- Only one type of user (Candidate) is fully implemented; Recruiter flow is minimal.

## Future Improvements
- **Resume Parsing**: Add a feature to automatically fill the registration form from a PDF resume.
- **Real-time Notifications**: Implement WebSockets for job match alerts.
- **Advanced Filters**: Enhanced search and filtering on the Job List page.

---

## Team Members

| Name | GitHub |
|------|--------|
| **Shivam Dubey** | [GitHub Profile](https://github.com/devsivv) |
| **Dhrutabrata Biswal** | [GitHub Profile](https://github.com/Dhruta25) |
| **Saloni Sahoo** | [GitHub Profile](https://github.com/saloni259) |

---

Built by **Byte_Force** team at **January Cohort, NIT Rourkela**
