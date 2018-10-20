#!/bin/bash
# Get GCP Compute Metadata for authenticating squid

/usr/bin/touch /etc/squid/username
/usr/bin/touch /etc/squid/password

curl -s -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/attributes/susername > /etc/squid/username
curl -s -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/attributes/spassword > /etc/squid/password
