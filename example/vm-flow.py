from cloudmesh.compute.aws import Provider as AWSProvider
from cloudmesh.compute.azure import AzProvider
from cloudmesh.flow.Flow import Flow

class MyFlow(Flow):
    def spawn_aws(self):
        pass

    def spawn_azure(self):
        pass

    def ping_aws(self):
        pass

    def ping_azure(self):
        pass

if __name__ == "__main__":
    flow = MyFlow(sys.argv[0])
