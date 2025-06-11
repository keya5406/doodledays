export function getDateRange(period: "weekly" | "monthly"){
    const today = new Date();
    let startDate: Date;

    if (period === "weekly") {
        startDate = new Date();
        startDate.setDate(today.getDate() - 7);
    } else if (period === "monthly") {
        startDate = new Date();
        startDate.setMonth(today.getMonth() - 1);
    } else {
        throw new Error("Invalid period specified. Use 'weekly' or 'monthly'.");
    }

 return { startDate, endDate: today };
}