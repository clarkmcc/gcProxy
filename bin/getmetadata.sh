#!/bin/bash
# Get GCP Compute Metadata for authenticating squid

echo "[META] Attempting to retreive metadata..."

/usr/bin/touch /etc/squid/username
touch /etc/squid/password

#curl -s -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/attributes/susername > /etc/squid/username
#curl -s -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/attributes/spassword > /etc/squid/password
