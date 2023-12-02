export function RelativeDate(date) {
    const now = new Date();
    const diffMilliseconds = now - date;
  
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
  
    if (diffMilliseconds < minute) {
      const seconds = Math.floor(diffMilliseconds / 1000);
      return `Il y a ${seconds} ${seconds === 1 ? 'seconde' : 'secondes'}`;
    } else if (diffMilliseconds < hour) {
      const minutes = Math.floor(diffMilliseconds / minute);
      return `Il y a ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    } else if (diffMilliseconds < day) {
      const hours = Math.floor(diffMilliseconds / hour);
      return `Il y a ${hours} ${hours === 1 ? 'heure' : 'heures'}`;
    } else if (diffMilliseconds < week) {
      const days = Math.floor(diffMilliseconds / day);
      return `Il y a ${days} ${days === 1 ? 'jour' : 'jours'}`;
    } else {
      const weeks = Math.floor(diffMilliseconds / week);
      return `Il y a ${weeks} ${weeks === 1 ? 'semaine' : 'semaines'}`;
    }
  }
  
  // Exemple d'utilisation
//   const date = new Date('2023-01-01T12:00:00');
//   const relativeTime = formatRelativeTime(date);
//   console.log(relativeTime);
  