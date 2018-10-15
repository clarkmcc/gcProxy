gcloud compute instances create  gcprox-1539605240133-320 --zone=us-east1-b --machine-type=f1-micro --image-family=debian-9 --image-project=debian-cloud  --metadata startup-script='#!/bin/bash
# Squid Installer

susername=$(curl -s -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/attributes/susername)
spassword=$(curl -s -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/attributes/spassword)

/bin/rm -rf /etc/squid
/usr/bin/apt update
/usr/bin/apt -y install apache2-utils squid
touch /etc/squid/passwd
/bin/rm -f /etc/squid/squid.conf
/usr/bin/touch /etc/squid/blacklist.acl
/usr/bin/wget --no-check-certificate -O /etc/squid/squid.conf https://raw.githubusercontent.com/serverok/squid-proxy-installer/master/squid.conf
/sbin/iptables -I INPUT -p tcp --dport 3128 -j ACCEPT
/sbin/iptables-save

#SED_SQUID_PORT

/usr/bin/htpasswd -b -c /etc/squid/passwd $susername $spassword

systemctl enable squid
systemctl restart squid'