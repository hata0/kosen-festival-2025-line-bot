export class GetReservationOutput {
    constructor(
        public readonly id: string,
        public readonly lineUserId: string,
        public readonly confirmationCode: string,
        public readonly status: string,
        public readonly createdAt: Date
    ){}
}

export class GetUncompletedCountOutput {
    constructor(
        public readonly count: number
    ) {}
}