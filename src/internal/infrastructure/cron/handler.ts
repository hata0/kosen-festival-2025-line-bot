export interface CronHandler {
  cron(controller: ScheduledController, ctx: ExecutionContext): Promise<void>;
}
