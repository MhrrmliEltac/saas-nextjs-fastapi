export enum PositionStageEnum {
  OPEN = "open",
  INTERVIEWING = "interviewing",
  OFFER = "offer",
}

export interface OpenPosition {
  id: string;
  title: string;
  department: string;
  candidates: number;
  stage: PositionStageEnum;
  posted_date: string;
}

export interface RequestPosition {
  title: string;
  department: string;
  candidates?: number;
  stage?: PositionStageEnum;
  posted_date?: string;
}

export interface RequestUpdatePosition {
  title?: string;
  department?: string;
  candidates?: number;
}

export interface RequestUpdateStage {
  stage: PositionStageEnum;
}
