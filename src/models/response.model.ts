export class ResponseModel {

    constructor(
        public code: number,
        public message: string,
        public data: any
    ) { }
}