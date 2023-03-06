package ssafy;

import java.io.IOException;
import java.util.StringTokenizer;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileSplit;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.GenericOptionsParser;
import org.apache.hadoop.mapreduce.Partitioner;

public class MatrixMulti {
	/* 
	Object, Text : input key-value pair type (always same (to get a line of input file))
	Text, IntWritable : output key-value pair type
	*/
	public static class MMMapper extends Mapper<Object, Text, Text, Text> {
		private Text keypair = new Text();
		private Text valpair = new Text();
		private String Matrix1name;
		private String Matrix2name;

		private int n;
		private int l;
		private int m;

		protected void setup(Context context) throws IOException, InterruptedException {
			Configuration config = context.getConfiguration();
			Matrix1name = config.get("Matrix1name", "A");
			Matrix2name = config.get("Matrix2name", "B");

			n = config.getInt("n", 10);
			l = config.getInt("l", 10);
			m = config.getInt("m", 10);
		}

		public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
			StringTokenizer token = new StringTokenizer(value.toString());
			String mat = token.nextToken();
			int row = Integer.parseInt(token.nextToken());
			int col = Integer.parseInt(token.nextToken());
			int v = Integer.parseInt(token.nextToken());

			if(mat.equals(Matrix1name)){
				valpair.set("" + col + " " + v);
				for(int j = 0; j < m; j++){
					String p = "" + row + "," + j;
					keypair.set(p);
					context.write(keypair, valpair);
				}
			}
			else if(mat.equals(Matrix2name)){
				valpair.set("" + row + " " + v);
				for(int i = 0; i < n; i++){
					String p = "" + i + "," + col;
					keypair.set(p);
					context.write(keypair, valpair);
				}
			}
		}
	}
	public static class MMReducer extends Reducer<Text, Text, Text, Text> {
		public void reduce(Text key, Iterable <Text> values, Context context)
			throws IOException, InterruptedException {
			for(Text tx : values){
				context.write(key, tx);
			}
		}
	}

	/* Main function */
	public static void main(String[] args) throws Exception {
		Configuration conf = new Configuration();
		String[] otherArgs = new GenericOptionsParser(conf,args).getRemainingArgs();
		if ( otherArgs.length != 2 ) {
			System.err.println("Usage: <in> <out>");
			System.exit(2);
		}
		FileSystem hdfs = FileSystem.get(conf);
		Path output = new Path(otherArgs[1]);
		if(hdfs.exists(output)) hdfs.delete(output, true);

		Job job = new Job(conf,"matrix multiply");
		job.setJarByClass(MatrixMulti.class);

		// let hadoop know my map and reduce classes
		job.setMapperClass(MMMapper.class);
		job.setReducerClass(MMReducer.class);

		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(Text.class); // Output value type

		// set number of reduces
		job.setNumReduceTasks(2);
		// Configuration config = job.getConfiguration();
		// config.set("name", "Shim");
		// config.setInt("one", 1);
		// config.setFloat("point_five", (float)0.5);


		// set input and output directories
		FileInputFormat.addInputPath(job,new Path(otherArgs[0]));
		FileOutputFormat.setOutputPath(job,new Path(otherArgs[1]));
		System.exit(job.waitForCompletion(true) ? 0 : 1 );
	}
}

