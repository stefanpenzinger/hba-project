# FH Hagenberg - Home and Building Automation

This project was made as part of the course "Home and Building Automation" at the University of Applied Sciences
Hagenberg.

## Project Description

For the seminar room SRA2, a KNX installation is to be planned that includes at least the following
functionality:

- Room access (use your preferred technology)
- HVAC (on/off, temperature, ventilation, humidity)
- Shade control
- Light On/Off
- Smoke Alarm
- Scenes (Morning, Day, Evening, Night)

Do not use a combined room controller. Instead of it, individual sensors and actuators (e.g. for switching
and dimming, etc.) should be used.
The required functionality should be modelled by using ETS6 and KNX-Virtual.

## Project Structure
As ETS6 allows in its demo version to only have 5 KNX devices, the project is split into multiple parts:
1. [Light Control and Shade Control with Weather Control Module and Presence Detection.](knx/projects/HBA-FH3-SRA2-01.knxproj)
2. [Shade Control with Scenes.](knx/projects/HBA-FH3-SRA2-02.knxproj)

The combined functionality of this project (if no constraints were given by ETS6) is documented in the [state diagram](knx/state-diagram/HBA-FH3-SRA2-state-diagram.puml).
