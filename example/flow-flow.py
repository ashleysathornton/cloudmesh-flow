import sys
import time
from cloudmesh.flow.Flow import Flow


class MyFlow(Flow):
    def a(self):
        print("in a!")
        time.sleep(5)
    def b(self):
        print("in b!")
        time.sleep(10)
    def c(self):
        print("in c!")
        time.sleep(10)

if __name__ == "__main__":
    Flow = MyFlow(sys.argv[0])
    Flow._run(sys.argv[1])