# Nitro Client

High-performance multi-protocol network client and DNS diagnostic suite for Windows and Android. Built with native C# WPF desktop architecture and modern network core engines.

[![Latest Release](https://img.shields.io/github/v/release/mehradbmz1/nitro-client?color=7C4DFF&label=Version&logo=github)](https://github.com/mehradbmz1/nitro-client/releases/latest)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20Android-blue?logo=windows&logoColor=white)](https://github.com/mehradbmz1/nitro-client/releases)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## Downloads

Official binary releases are published directly on GitHub Releases:

| Platform | Package | Description | Direct Download |
| :--- | :--- | :--- | :--- |
| **Windows** | Setup Wizard (`NitroVPN_Setup.exe`) | Automatic firewall rules, TCP autotuning, desktop shortcuts | [Download Setup (.exe)](https://github.com/mehradbmz1/nitro-client/releases/latest/download/NitroVPN_Setup.exe) |
| **Windows** | Portable (`NitroVPN_Windows.zip`) | Standalone portable bundle, no installation required | [Download Portable (.zip)](https://github.com/mehradbmz1/nitro-client/releases/latest/download/NitroVPN_Windows.zip) |
| **Android** | Package (`NitroVPN_Release.apk`) | Universal Android application package | [Download APK](https://github.com/mehradbmz1/nitro-client/releases/latest/download/NitroVPN_Release.apk) |

Older releases and changelogs are available under the [Releases History](https://github.com/mehradbmz1/nitro-client/releases).

---

## Features

### Desktop User Interface
- **Widescreen Landscape Layout**: 980x640 responsive desktop layout with persistent navigation sidebar and spacious content workspace.
- **Modern Fluent Styling**: High-DPI ClearType typography, 14px rounded cards, acrylic accents, and seamless Dark/Light theme switching.
- **Pure English Interface**: Standardized international terminology across all dialogs, controls, and settings.

### Network Performance Modes
- **Standard (Low Data)**: Reduced buffer size, aggressive idle socket timeout, multiplexing disabled for minimal background data consumption.
- **Turbo Speed**: Expanded buffer allocations, multi-channel connection multiplexing, and TCP Fast Open for high-bandwidth streaming.
- **Gaming Mode**: Low handshake latency, fast UDP routing, and minimized jitter for real-time applications.
- **Resilient Transport**: TLS ClientHello packet fragmentation for reliable connections over restrictive network topologies.

### Intelligent Routing & Edge Diagnostics
- **Nearest Anycast Edge Diagnostics**: Real-time proxy latency measurement with Anycast edge fallback (`1.1.1.1:443`, `8.8.8.8:443`) eliminating false timeout indicators.
- **Dynamic Port Conflict Resolver**: Dynamic port discovery for local SOCKS and HTTP listeners preventing collisions with existing services.
- **Unified Format Import**: Decryption engine supporting binary Napsternet (`.npvs`, `.npv`, `.npv4`), Clash YAML/JSON, and multi-line base64 payloads.
- **Zero-Overhead DPAPI Encryption**: Sensitive configuration parameters encrypted locally via Windows Data Protection API with zero CPU overhead.

### Windows Setup Wizard
- **Automated Firewall Rules**: Configures inbound allow rules for the application and network engines (`netsh advfirewall`).
- **Network Stack Tuning**: Enables TCP window auto-tuning and Receive Side Scaling (RSS) for optimized socket throughput.
- **Registry Integration**: Registers custom URI protocol scheme for subscription imports and creates clean uninstallation entries.

---

## License
This project is licensed under the MIT License.
