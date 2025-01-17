import { StatusCodes } from "http-status-codes";

export const status = {
  // Success
  SUCCESS: { status: StatusCodes.OK, isSuccess: true, code: 2000, message: "요청이 성공적으로 처리되었습니다." },
  CREATED: { status: StatusCodes.CREATED, isSuccess: true, code: 2001, message: "자원이 성공적으로 생성되었습니다." },
  
  // Client Errors
  BAD_REQUEST: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: 4000, message: "잘못된 요청입니다." },
  NOT_FOUND: { status: StatusCodes.NOT_FOUND, isSuccess: false, code: 4004, message: "자원을 찾을 수 없습니다." },
  
  // Server Errors
  INTERNAL_SERVER_ERROR: { status: StatusCodes.INTERNAL_SERVER_ERROR, isSuccess: false, code: 5000, message: "서버 내부 오류입니다." },
  
  // Custom Errors
  VALIDATION_ERROR: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: 4005, message: "유효성 검사 오류입니다." },
  DUPLICATE_ERROR: { status: StatusCodes.CONFLICT, isSuccess: false, code: 4006, message: "이미 존재하는 자원입니다." },
  
  // Add more as needed
};
