# Google Cloud Platform Proxy Maker
This NodeJS Script allows you to build and host your own proxy servers on the Google Cloud Platform. It can be difficult figuring out how to configure a proxy, especially on GCP, however this script lets you pick your sizes, instance names, instance types, proxy authentication credentials, ports, firewall configuration and more. It does not require you to authenticate the script with your GCP account for your security but instead gives you the customized commands to paste into the GCP Cloud Shell which creates the proxies on your account.

## System Requirements
* A machine with NodeJS installed (can run on any OS NodeJS can)
* A GCP account (trial or with billing enabled). Note that if you choose instance sizes over the trial size on your trial account you may be subject to billing charges.

## How it Works
It can be difficult configruing a proxy server just right, especially on a cloud linux/debian distro. This script generates the GCP Cloud Shell command that creates an infinite number of proxy serverss on your GCP account at varying locations with different instance types, with the ability to preempt the instances, totaling up to 3,276 different configurations. 

## Licensing
The software is licensed based. After purchase you will receive a license key, we'll register the username with our licensing server and you're good to go. The licensing is enforced in the softare via a system profiler to verify that the buyer is the one using the softare.

