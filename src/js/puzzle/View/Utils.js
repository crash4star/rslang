class Utils {
  static getDayNameFromDate(dateString) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayName = days[date.getDay()];
    return dayName;
  }

  static convertDataFormate(dateString) {
    const date = new Date(dateString);
    const formatedDate = date.toString().split(' ');
    const result = `${formatedDate[0]} ${formatedDate[2]} ${formatedDate[1]}`;
    return result;
  }

  static convertCoordinatesFormate(coordinates) {
    const result = coordinates.toString().split('.');
    return `${result[0]}° ${result[1]}'`;
  }
}

export default Utils;
