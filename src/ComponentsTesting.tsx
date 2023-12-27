import Badge from './components/badge';

export default function ComponentsTesting() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex w-full items-center justify-center gap-4">
        <Badge>Label</Badge>
        <Badge size="md">Label</Badge>
        <Badge size="lg">Label</Badge>
        <Badge variant="secondary">Label</Badge>
        <Badge variant="secondary" size="md">
          Label
        </Badge>
        <Badge variant="secondary" size="lg">
          Label
        </Badge>
      </div>
    </div>
  );
}
