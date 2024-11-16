import { Button } from '@radix-ui/themes';

export function ViewSubmissionNavigationActions() {
  return (
    <>
      <Button variant="surface" color="red" type="button">
        Reject
      </Button>
      <Button role="button" type="button" variant="surface" color="green">
        Approve
      </Button>
    </>
  );
}
