import axios from 'axios';
import { environment } from '../utils/environment';
export const getCSRDataByCaseId = async (caseId) => {
    const { data } = await axios.get(`${environment.API_BASE_URL}/crs/getCRSData/${caseId}`, {
        headers: {
            Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyX2RlZmF1bHQiLCJpc3MiOiJodHRwczovL3dlYnNpdGVhcHAuY29tIiwic2J4VXNlciI6eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VyX2RlZmF1bHQiLCJpZF9yb2xlIjoxLCJyb2xlX25hbWUiOiJhZG1pbiIsImlzX2FkbWluIjp0cnVlfSwic2J4UGVybWlzc2lvbnMiOltdLCJqdGkiOiJkNTY0NDIzYS0wOTg4LTQxZTUtOTgzZi1mYzNkMGJlODUyYTkiLCJpYXQiOjE2NTYyOTcxNTcsImV4cCI6MTY1NjQxMjM1N30.cwdNi7lrNlWCtwQmm8W91yd9F3aoEeqwDTzoOcLjsIc'
        }
    });
    return data.data[0].hhr.data;
};
