export function formatDateTime(date: Date): { formattedDate: string; formattedTime: string } {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const [
      { value: month },,
      { value: day },,
      { value: year },,
      { value: hour },,
      { value: minute },,
      { value: dayPeriod }
    ] = formatter.formatToParts(date);
  
    return {
      formattedDate: `${month}/${day}/${year}`,
      formattedTime: `${hour}:${minute}${dayPeriod.toLowerCase()}`
    };
  }