FROM drecom/centos-base:latest

RUN cd /
RUN git clone https://github.com/person896/ShowPreper.git
RUN cd ShowPreper && npm update
RUN cd ShowPreper && npm install

WORKDIR /ShowPreper

CMD [ "bash", "start.sh" ]
