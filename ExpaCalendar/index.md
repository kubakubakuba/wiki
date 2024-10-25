# Expa Calendar Generator

The repository of this project is located on [GitHub](https://github.com/kubakubakuba/ExpaCalendar/)

Generator of pdf calendars using [Google Calendar API](https://developers.google.com/calendar/).

## Usage
Create a Google API application with access to Calendar API and create OAuth 2 credentials for it ([here is how](./credentials)).

Clone the repository and create a `Config` class that defines the pdf generation.
```python
class Config:
	def __init__(self):
		self.calendar_link = 'longlink@group.calendar.google.com'
		self.calendar_shortlink = 'http://goo.gl/shorlink'
		self.output_folder = 'programy2024'
		self.name = 'Mikroexpedice'
		self.start_date = '2024;10;25'
		self.end_date = '2024;10;28'
		self.qr_size = 40
		self.lang = 'cz'
		self.rick_probability = 5
		self.lat = 49.971980
		self.lng = 16.271130
		self.tmz = 'Europe/Prague'
		self.min_elevation = 10
		self.satellite_names = ['NOAA 15', 'NOAA 18', 'NOAA 19', 'METEOR-M 2', 'ISS (ZARYA)']

from ExpaCalendar import ExpaCalendar as ec

calendar = ec(Config())
events = calendar.get_calendar_events()
calendar.generate_pdf(events)

```
Don't forget to install the required packages:
```bash
pip install -r requirements.txt
```