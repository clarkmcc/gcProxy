#!/bin/bash
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
/sbin/iptables -I INPUT -p tcp --dport SQUID_PORT -j ACCEPT
/sbin/iptables-save

#SED_SQUID_PORT

echo "Username: $susername"
echo "Password: $spassword"

/usr/bin/htpasswd -b -c /etc/squid/passwd admin password

systemctl enable squid
systemctl restart squid

