export class Comment {

    constructor(
        public userId: string,
        public content: string,
        public timestamp: Object,
        public commentId: number,
        public parentId=0,
        public reply=false
    ) {
    }
}

