import config from "./config.json";

export const signupEndpoint = `${config.host}/api/registeruser`;
export const signinEndpoint = `${config.host}/api/signinuser`;
export const gameDetailEndpoint = `${config.host}/api/gamedetails`;
export const highScoreEndpoint = `${config.host}/api/highscore`;
export const gameCountEndpoint = `${config.host}/api/gamecount`;
