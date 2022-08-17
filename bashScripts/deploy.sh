#!/bin/bash

echo ">> start of deploy ... "

# All deploy files "cp" to apache root directory
# -r 옵션을 사용하지 않으면 폴더복사를 못함
rm -rf /home/centos/addtune_partner/static
rm -rf /home/centos/addtune_partner/images
\cp -rf /home/centos/deployZip/* /home/centos/addtune_partner/www

echo ">> end of deploy ... "