import configparser
import os
import subprocess


BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
MXI = os.path.join(BASE, 'psMaskSync.mxi')
MXP = os.path.join(BASE, 'psMaskSync_CS4.mxp')
ZXP = os.path.join(BASE, 'psMaskSync_CS5Plus.zxp')

BUILDCONFIG = os.path.join(os.path.dirname(__file__), 'config.ini')


class Tools(object):
    def __init__(self, extMan, zip7):
        self.extMan = extMan
        self.zip7 = zip7


def getConfig():
    config = configparser.SafeConfigParser()
    config.read(BUILDCONFIG)

    extMan = config.get('Programs', 'EXTENSION_MANAGER')
    zip7 = config.get('Programs', 'ZIP7')

    return Tools(extMan, zip7)


def package():
    try:
        os.remove(MXP)
    except:
        pass

    tools = getConfig()
    subprocess.call('{0} -package mxi={1} mxp={2}'.format(tools.extMan, MXI, MXP))
    subprocess.call('{0} -package mxi={1} zxp={2}'.format(tools.extMan, MXI, ZXP))


if __name__ == '__main__':
    package()
