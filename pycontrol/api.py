from __future__ import print_function
import sys
import zerorpc


class PyControlApi(object):
    def press(self, event):
        print('press', event)

    def click(self, event):
        print('click', event)


def parse_port():
    return 4242


def main():
    addr = 'tcp://127.0.0.1:' + str(parse_port())
    s = zerorpc.Server(PyControlApi())
    s.bind(addr)
    print('start running on {}'.format(addr))
    s.run()


if __name__ == '__main__':
    main()
