FROM drecom/centos-base:latest

RUN cd /
RUN yum update -y
RUN yum install -y epel-release yum-utils
RUN yum install -y nodejs
RUN yum install -y git
RUN git clone https://github.com/abbr/ShowPreper.git
RUN cd ShowPreper && npm install

WORKDIR /ShowPreper

CMD [ "bash", "start.sh" ]
